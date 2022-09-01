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

def intervalInMinutes(data,interval):
	dataInInterval=[]
	lastTime=data[0][3]
	lastPrecipitation=0
	errorRange= 0.5

	i=0
	while i<len(data):
		precipitationDelta=data[i][2]-lastPrecipitation
		m = lastTime.minute + interval
		if m < 60:
			lastTime= time(lastTime.hour,m,lastTime.second)
		else : 
			lastTime= time(lastTime.hour+1,m-60,lastTime.second)
		t=digitalizacion.totalMinutes(lastTime)
		if(t-errorRange <digitalizacion.totalMinutes(data[i+interval-1][3])< t+errorRange):
			lastPrecipitation=data[i+interval-1][3]
		else:
			lastPrecipitation=data[i+interval][3]
		dataInterval.append([data[i][3],precipitationDelta])
		i+=interval
	df=pd.DataFrame(dataInterval,columns=['time','precipitation'])
	return df

def calculateNearTime(t,data,interval):
	m = t.minute + interval
	if m < 60:
		lastTime= time(lastTime.hour,m,lastTime.second)
	else : 
		lastTime= time(lastTime.hour+1,m-60,lastTime.second)
