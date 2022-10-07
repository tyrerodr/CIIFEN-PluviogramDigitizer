import numpy as np
from skimage import exposure
import cv2
from datetime import time, timedelta, datetime
from math import modf

def saveImg(name,img):
	cv2.imwrite('/digitalizacion/{}.png'.format(name),img)

def openImg(route):
	img=cv2.imread(route)
	return img

#pytesseract.pytesseract.tesseract_cmd = r'D:/Aharon/Programas instalados/Tesseract-OCR/tesseract.exe'

def identify_pluviogram_by_color(img,lim1,lim2):
	gamma_corrected = exposure.adjust_gamma(img,2)
	imgHSV = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
	p2,p98 = np.percentile(imgHSV,(2,98))
	img_rescale = exposure.rescale_intensity(imgHSV,in_range=(p2,p98))
	maskblue =cv2.inRange(img_rescale,lim1,lim2)
	kernel = np.ones((1,1),np.uint8)
	maskblue = cv2.morphologyEx(maskblue,cv2.MORPH_CLOSE,kernel)
	maskblue = cv2.morphologyEx(maskblue,cv2.MORPH_OPEN,kernel)
	maskImg = cv2.bitwise_and(img,img,mask=maskblue)
	return maskImg


def binarization(img,param):
	img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	mask=img >param
	img[mask] = 0
	return img 	 

def resize(img,scale):
	scale_percent = scale/100 # percent of original size
	width = int(img.shape[1] * scale_percent)
	height = int(img.shape[0] * scale_percent)
	dim = (width, height)
	return cv2.resize(img,dim)

def imageWithoutGrids(img):
	limInferior=np.array([90,40,20],np.uint8)
	limSuperior=np.array([150,255,250],np.uint8)
	imgarray= np.array(img)
	img=identify_pluviogram_by_color(imgarray,limInferior,limSuperior)
	return img


#----------------
#cv2.imshow("pluviograma",img)
#cv2.waitKey()
#cv2.destroyAllWindows()
#----------------

#Detección de colores en OpenCV
#-- Transformación de imagen RGB a HSV para intensificar colores
#Procesamiento a través de Skimage

#Analisis de imágen con tesseract
#-- Extracción de texto de la imágen

#Ojito : metodología tidyverse


def identifyUpperLimit(img):
	orgImg=img
	img = binarization(img,170)
	nRow , nCol = img.shape
	nRow_range = nRow/12
	img= img[0:int(nRow_range)]
	stripe_large=0
	last_index=0
	for i in range(int(nRow_range)):
		limit = np.count_nonzero(img[i])
		if( limit > stripe_large ):
			stripe_large = limit
			last_index=i
	return last_index

def identifyLowerLimit(img):
	orgImg=img
	img = binarization(img,170)
	nRow , nCol = img.shape
	nRow_range = nRow/20
	begin_index= int(18*(nRow_range))
	img= img[begin_index:]
	stripe_large=0
	index=0
	for i,e in reversed(list(enumerate(img))):
		limit = np.count_nonzero(e)
		if( limit > int(nCol/2) ):
			stripe_large = limit
			index = i+begin_index
			return index

def identifyLeftLimit(img):
	img= img[identifyUpperLimit(img):identifyLowerLimit(img)]
	img = binarization(img,200)
	firstRow = img[0]
	for i,e in list(enumerate(firstRow)):
		if e != 0:
			return i

def identifyRightLimit(img):
	img= img[identifyUpperLimit(img):identifyLowerLimit(img)]
	img = binarization(img,200)
	firstRow = img[0]
	for i,e in reversed(list(enumerate(firstRow))):
		if e != 0:
			return i

def identifyLimits(img):
	upperLimit=identifyUpperLimit(img)
	lowerLimit=identifyLowerLimit(img)
	leftLimit=identifyLeftLimit(img)
	rightLimit= identifyRightLimit(img)
	return lowerLimit,upperLimit,leftLimit,rightLimit

def calculatePrecipitationRel(max_precipitation,min_precipitation,height):
	totPrepModel = max_precipitation + abs(min_precipitation)
	return height/totPrepModel

def calculatedPrecipitation(pixel, relation, max_precipitation, min_precipitation):
	precipitation = (pixel * (1/relation)) 
	return (max_precipitation -precipitation) 

def hoursToMinutes(hours:int):
	return hours*60

def hoursToSeconds(hours:int):
	return hours*60*60

def minutesToSeconds(minutes: int):
	return minutes*60 

def secondsToMinutes(seconds: int):
	return seconds/60

def TotalSeconds(hours, minutes,seconds):
	return hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds

def totalMinutes(hours, minutes,seconds):
	return hoursToMinutes(hours) + minutes + secondsToMinutes(seconds)

def minutesToHours(minutes : int)-> float:
	return minutes/60

def minutesAndHour(hours: float):
	minutes,hours = modf(hours)
	minutes= minutes*60
	seconds, minutes = modf(minutes)
	return int(hours),int(minutes), int(seconds*60)

def calculateTimeRel(min_time: time, max_time: time, width):
	hours = 24 + max_time.hour - min_time.hour
	hoursInMinutes = hoursToMinutes(hours)
	minutes = max_time.minute - min_time.minute
	second= (max_time.second - min_time.second)/60
	totTime = hoursInMinutes + minutes
	return width/totTime

def calculateTime(pixel,relation, min_time):
	return (pixel* 1/relation) + totalMinutes(min_time.hour, min_time.minute, min_time.second)

def timeFormat(minutes: int)-> time:
	hours,minutes,seconds = minutesAndHour(minutesToHours(minutes))
	hours = hours-24 if hours >= 24 else hours 
	return time(hours, minutes, seconds)

def prepareImg(img):
	img= limitImage(img)
	img = resize(img,100)
	img = imageWithoutGrids(img)
	img = binarization(img,200)
	return img
#Start : first time when the digitalization have to calculate precipitation, it is a station data
def digitalization(img, model,start, days):
	info=[]
	
	img = prepareImg(img)
	precipitation_rel= calculatePrecipitationRel(model['max_precipitation'], model['min_precipitation'],
												 img.shape[0])
	time_rel= calculateTimeRel(model['min_time'], model['max_time'] , img.shape[1])
	rows, columns = img.shape
	infoDay=start.date()
	last_precipitation = 0 
	full_counter=0
	error_range = 1.5
	lock= False
	print(rows,columns)
	for x in range(columns):
		for y in range(rows):
			if img[y,x] != 0:
				precipitation = calculatedPrecipitation(y,precipitation_rel,model['max_precipitation']
														, model['min_precipitation'])
				time = calculateTime(x,time_rel, model['min_time'])
				#if time<(start.hour*60+start.minute):
				#	break
				if not lock and (time >= 24*60):
					lock= not lock
					infoDay=infoDay + timedelta(days=1)
				precipitation = precipitation + (10*full_counter)
				c=isAcceptable(error_range,precipitation,last_precipitation,full_counter,model['max_precipitation'])
				if(c>=0):
					if(c==1):
						#print(full_counter)
						full_counter += 1
						precipitation = precipitation + 10
					#time=timeFormat(time)
					#time=datetime(infoDay.year,infoDay.month,infoDay.day,time.hour,time.minute,time.second)
					info.append([precipitation,time])
					last_precipitation= precipitation 
					#orgiginal_image = cv2.circle(original_image, (x,y), 1, (0,255,255), 1)	
					break
	#showImg(original_image)
	return info

def isAcceptable(error_range,precipitation,last_precipitation,counter,max_precipitation):
	millimetersAcumulated= counter*10
	max_precipitation= max_precipitation + millimetersAcumulated
	c1=last_precipitation-error_range<precipitation<error_range+last_precipitation
	c2=9+millimetersAcumulated<last_precipitation<max_precipitation
	c3=precipitation<last_precipitation
	if( c1 ):
		return 0
	elif(c2 and c3):
		return 1
	else:
		return -1



def limitImage(img):
	lower_limit,upper_limit,left_Limit,right_limit= identifyLimits(img)
	img= img[upper_limit:lower_limit,left_Limit:right_limit]
	return img

def changeRange(arr):
	withoutIncrement=[]
	for p,t in arr:
		withoutIncrement.append([p - (p//10)*10,t])
	return withoutIncrement
#precipitation_rel = calculatePrecipitationRel(max_precipitation,min_precipitation,img.shape[0])
#time_rel = calculateTimeRel(min_time,max_time,img.shape[1])

#print("pixel per precipitation : {}".format(precipitation_rel))
#img = cv2.circle(img, (320,500), 2, (0,255,255), 5)
#print("Precipitación del punto:")
#print(calculatedPrecipitation(500,precipitation_rel,max_precipitation))
#print("Tiempo del punto:")
#print(timeFormat(calculateTime(320,time_rel),min_time))

def showImg(img):
	cv2.imshow("pluviograma",img)
	cv2.waitKey()
	cv2.destroyAllWindows()


#img=digitalization(img,model)
#img=resize(img,50)
#showImg(img)





#digitalization(img,model)
#prueba(img)