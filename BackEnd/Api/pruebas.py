import digitalizacion as dt
from datetime import time,datetime,date
import numpy as np
import cv2
import dataProcesing as dp
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

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


data=dt.digitalization(img,model,datetime(2012,1,1,6,30,0),1)
withoutIncrement=[]
infoDate=date(2012,1,1)
for x,y,p,t in data:
	withoutIncrement.append([x,y,p - (p//10)*10,t])
		
df=dp.crudeDataClean(withoutIncrement)
df_plot=df.plot('minutes','precipitation')

arr1=[]
arr2=[]
dp.planifier(data,10,arr1,arr2)

for data in arr1:
	print("precipitación: {} hora:{}".format(data['hora'],data['precipitacion']))

print("-----------------------------------")

for data in arr2:
	print("precipitación: {} hora:{}".format(data[0],data[1]))

plt.show()
#relationTest(img)


#dt.showImg( dt.binarization(dt.resize(dt.imageWithoutRedGrids(img),50),200))
#dt.showImg(dt.resize(dt.imageWithoutRedGrids(img),50))