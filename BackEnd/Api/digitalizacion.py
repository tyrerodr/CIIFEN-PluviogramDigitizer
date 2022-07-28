import matplotlib
import matplotlib.pyplot as plt
import skimage as sk
from skimage import io
from PIL import Image
import numpy as np
from skimage import exposure,img_as_float
import cv2
# import pytesseract
from datetime import time
from math import modf

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

def identify_pixel_time_rel(img):		
	#imgf = cv2.adaptiveThreshold(imgpp,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)
	imgf = binarization(img,170)
	kernel = np.ones((1,1),np.uint8)
	erosion = cv2.erode(imgf,kernel,iterations = 1)
	return imgf

def numbers_stripe(img):
	limit_of_stripe= identifyUpperLimit()
	return orgImg[0:limit_of_stripe]

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

def imageWithoutRedGrids(img):

	limInferior=np.array([90,50,0],np.uint8)

	limSuperior=np.array([145,200,255],np.uint8)

	imgarray= np.array(img)

	img=identify_pluviogram_by_color(imgarray,limInferior,limSuperior)

	#img_rgb = cv2.cvtColor(numbers_stripe(imgarray), cv2.COLOR_BGR2RGB)

	#img_rgb= numbers_stripe(imgarray)

	#print(pytesseract.image_to_data(img_rgb, lang='eng'))

	#img=resize(img_blue,50)
	#hImg, wImg, _ = img.shape

	return img

#boxes = pytesseract.image_to_boxes(img_rgb ,lang='eng', config='--psm 11 --oem 3 -c tessedit_char_whitelist=0123456789')
#for b in boxes.splitlines():
#	b = b.split(' ')
#	print(b)
#	x, y, w, h = int(b[1]), int(b[2]), int(b[3]), int(b[4])
#	cv2.rectangle(img, (x, hImg - y), (w, hImg - h), (50, 50, 255), 1)

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

def identifyLeftyLimit(img):
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
	leftLimit=identifyLeftyLimit(img)
	rightLimit= identifyRightLimit(img)
	return lowerLimit,upperLimit,leftLimit,rightLimit

def calculatePrecipitationRel(max_precipitation,min_precipitation,height):
	totPrepModel = max_precipitation + abs(min_precipitation)
	return height/totPrepModel

def calculatedPrecipitation(pixel, relation, max_precipitation):
	precipitation = (pixel * (1/relation)) 
	return max_precipitation -precipitation

def hoursToMinutes(hours:int):
	return hours*60

def minutesToSeconds(minutes: int):
	return minutes*60 

def totalMinutes(hours, minutes):
	return hoursToMinutes(hours) + minutes  

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
	totTime = hoursInMinutes + minutes
	#totalMinutes(time(max_time.hour - min_time.hour, max_time.minute - min_time.minute))
	return width/totTime

def calculateTime(pixel,relation):
	return pixel* 1/relation

def timeFormat(minutes: int , min_time: time)-> time:
	min_time_in_minutes = totalMinutes(min_time.hour,min_time.minute)
	tot_minutes = minutes + min_time_in_minutes
	hours,minutes,seconds = minutesAndHour(minutesToHours(tot_minutes))
	hours = hours-24 if hours >= 24 else hours 
	return time(hours, minutes, seconds + min_time.second)


def digitalization(img, model):
	precipitation_rel= calculatePrecipitationRel(model['max_precipitation'], model['min_precipitation'],
												 img.shape[0])
	time_rel= calculateTimeRel(model['min_time'], model['max_time'] , img.shape[1])
	original_image= img
	img = imageWithoutRedGrids(img)
	img = binarization(img,200)
	rows, columns = img.shape
	for x,row in list(enumerate(img)):
		for y,column in list(enumerate(row)):
			if column != 0:
				precipitation = calculatedPrecipitation(x,precipitation_rel,max_precipitation)
				time = calculateTime(y,time_rel)
				time= timeFormat(time, min_time)
				orgiginal_image = cv2.circle(original_image, (y,x), 2, (0,255,255), 5)
				print("({},{}) Precipitation : {}, Time: {}".format(x,y,precipitation,time))
	return original_image



def limitImage(img):
	lower_limit,upper_limit,left_Limit,right_limit= identifyLimits(img)
	img= img[upper_limit:lower_limit,left_Limit:right_limit]
	return img

min_precipitation=-0.3
max_precipitation = 10.5

min_time= time(5,30,0)
max_time = time(7,35,0)

model ={'min_precipitation': min_precipitation,
		'max_precipitation' : max_precipitation,
		'min_time' : min_time,
		'max_time' : max_time}

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

#img=resize(img,50)
#img=digitalization(img,model)
#showImg(img)



