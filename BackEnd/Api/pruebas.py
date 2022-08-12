import digitalizacion as dt
from datetime import time
import numpy as np
import cv2

img=dt.openImg("m162-01-04-2012-editada.png")

def relationTest(img):
	min_precipitation=-0.3
	max_precipitation = 10.5

	min_time= time(5,30,0)
	max_time = time(7,11,0)

	model ={'min_precipitation': min_precipitation,
		'max_precipitation' : max_precipitation,
		'min_time' : min_time,
		'max_time' : max_time}
	imgPreparetion= dt.imageWithoutRedGrids(img)
	
	imgPreparetion = dt.binarization(imgPreparetion,200)

	img=dt.resize(img,50)
	img=dt.limitImage(img)
	colorTuple=[(255,0,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255),(0,255,255)]
	pixelRelation= dt.calculatePrecipitationRel(model['max_precipitation'], model['min_precipitation'],img.shape[0])
	timeRelation= dt.calculateTimeRel(model['min_time'], model['max_time'], img.shape[1])
	for h in [8,15,22,5]:
		totInitialMinutes= dt.hoursToMinutes(h)- dt.hoursToMinutes(min_time.hour) - min_time.minute
		timePixels= int(totInitialMinutes * timeRelation)
		for p in np.arange(11):
			precipitationPixels = img.shape[0] - int(p*pixelRelation -(model['min_precipitation']*pixelRelation))
			print(timePixels)
			print(precipitationPixels)
			img = cv2.circle(img, (timePixels,precipitationPixels), 2, colorTuple[p], 10)
			
	#return img

			
	dt.showImg(img)




min_precipitation=-0.3
max_precipitation = 10.5

min_time= time(5,30,0)
max_time = time(7,11,0)
model ={'min_precipitation': min_precipitation,
		'max_precipitation' : max_precipitation,
		'min_time' : min_time,
		'max_time' : max_time}

dt.digitalization(img,model)




#dt.showImg( dt.binarization(dt.resize(dt.imageWithoutRedGrids(img),50),200))
#dt.showImg(dt.resize(dt.imageWithoutRedGrids(img),50))