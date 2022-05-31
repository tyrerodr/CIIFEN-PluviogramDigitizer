import matplotlib
import matplotlib.pyplot as plt
import skimage as sk
from skimage import io
from PIL import Image 
import numpy as np
from skimage import exposure,img_as_float
import cv2
import pytesseract


def identify_pluviogram_by_color(img,lim1,lim2):
	gamma_corrected = exposure.adjust_gamma(img,2)
	imgHSV = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
	p2,p98 = np.percentile(imgHSV,(2,98))
	img_rescale = exposure.rescale_intensity(imgHSV,in_range=(p2,p98))
	maskblue =cv2.inRange(img_rescale,limInferior,limSuperior)
	kernel = np.ones((2,2),np.uint8)
	maskblue = cv2.morphologyEx(maskblue,cv2.MORPH_CLOSE,kernel)
	maskblue = cv2.morphologyEx(maskblue,cv2.MORPH_OPEN,kernel)
	maskImg = cv2.bitwise_and(img,img,mask=maskblue)
	return maskImg

def identify_pixel_time_rel(img):		
	#imgf = cv2.adaptiveThreshold(imgpp,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY,11,2)
	imgf = binarization(img)
	kernel = np.ones((1,1),np.uint8)
	erosion = cv2.erode(imgf,kernel,iterations = 1)
	return imgf

def numbers_stripe(img):
	orgImg=img
	img = binarization(img)
	nRow , nCol = img.shape
	nRow_range = nRow/12
	img= img[0:int(nRow_range)]
	stripe_large=0
	last_index=0
	for i in range(int(nRow_range)):
		limit = np.count_nonzero(img[i])
		if( limit > stripe_large ):
			stripe_large = limit
			last_index=i;
	return orgImg[0:last_index]

def is_in_range(top1,bot2,number):
	print("Implementar")


def binarization(img):
	img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	mask=img >190
	img[mask] = 0
	return img 	 

def resize(img,scale):
	scale_percent = scale/100 # percent of original size
	width = int(img.shape[1] * scale_percent)
	height = int(img.shape[0] * scale_percent)
	dim = (width, height)
	return cv2.resize(img,dim)

pytesseract.pytesseract.tesseract_cmd = r'D:/Aharon/Programas instalados/Tesseract-OCR/tesseract.exe'

limInferior=np.array([90,50,0],np.uint8)

limSuperior=np.array([145,200,255],np.uint8)

img=cv2.imread('m162-01-04-2012-editada.png')

imgarray= np.array(img)

img_blue=identify_pluviogram_by_color(imgarray,limInferior,limSuperior)

#img_rgb = cv2.cvtColor(numbers_stripe(imgarray), cv2.COLOR_BGR2RGB)

img_rgb= numbers_stripe(imgarray)

#print(pytesseract.image_to_data(img_rgb, lang='eng'))

img=resize(img_blue,50)
hImg, wImg, _ = img.shape

boxes = pytesseract.image_to_boxes(img ,lang='eng', config='--psm 11 --oem 3 -c tessedit_char_whitelist=0123456789')
for b in boxes.splitlines():
	b = b.split(' ')
	print(b)
	x, y, w, h = int(b[1]), int(b[2]), int(b[3]), int(b[4])
	cv2.rectangle(img, (x, hImg - y), (w, hImg - h), (50, 50, 255), 1)



#----------------
cv2.imshow("pluviograma",img)
cv2.waitKey()
cv2.destroyAllWindows()
#----------------

#Detección de colores en OpenCV
#-- Transformación de imagen RGB a HSV para intensificar colores
#Procesamiento a través de Skimage

#Analisis de imágen con tesseract
#-- Extracción de texto de la imágen

#Ojito : metodología tidyverse