import numpy as np
import pandas as pd
import digitalizacion
from datetime import time,timedelta

#data: List [x,y,precipitation,time in minutes]
def crudeDataClean(data):
	data= np.asanyarray(data)
	df= pd.DataFrame(data, columns=['x','y','precipitation','minutes'])
	#df=df.drop_duplicates('minutes')
	#df=df.sort_values('minutes')
	#for i in range(0,df.shape[0],10)

	return df

#def addToTimeSerie(arr,p,t):

def intervalInMinutes(data,interval):
	dataInInterval=[]
	lastTime=0
	lastPrecipitation=0
	
	for _,_,p,t in data:
		if ((t.minute%interval)==0 ) and (lastTime != t.minute):
			diffence=p-lastPrecipitation if p-lastPrecipitation>0 else 0
			dataInInterval.append([diffence,t])
			lastPrecipitation = p
			lastTime = t.minute

	#for d in dataInInterval:
	# print("Precipitation:{}, time:{}".format(round(d[0],2),d[1]))
	return dataInInterval


def calculateSchedule(data):
	dataInSchedule=[]
	lastTime=0
	lastPrecipitation=0
	for _,_,p,t in data:
		if ( t.minute==0 ) and (lastTime != t.hour):
			diffence=p-lastPrecipitation if p-lastPrecipitation>0 else 0
			difference= p - lastPrecipitation
			dataInSchedule.append([diffence,t])
			lastPrecipitation= p
			lastTime = t.hour

	for p,t in dataInSchedule:
		print(p,t)
	return dataInSchedule

