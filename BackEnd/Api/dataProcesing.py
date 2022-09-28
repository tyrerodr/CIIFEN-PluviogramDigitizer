import numpy as np
import pandas as pd
import digitalizacion
from datetime import time,timedelta,datetime
from threading import Thread
#data: List [x,y,precipitation,time in minutes]



def crudeDataClean(data):
	data= np.asanyarray(data)
	df= pd.DataFrame(data, columns=['x','y','precipitation','minutes'])
	#df=df.drop_duplicates('minutes')
	#df=df.sort_values('minutes')
	#for i in range(0,df.shape[0],10)

	return df

#def addToTimeSerie(arr,p,t):

# DATA = [{
	# 	{
    #       hora: '15:00',
    #       precipitacion: '1.00'
    #   },]

def intervalInMinutes(data,interval,arr):
	if(len(arr)>0):
		print("Arreglo no vacio")
		return None
	lastTime=0
	lastPrecipitation=0
	
	for _,_,p,t in data:
		if ((t.minute%interval)==0 ) and (lastTime != t.minute):
			diffence=p-lastPrecipitation if p-lastPrecipitation>0 else 0
			arr.append({'hora': str(t) , 'precipitacion': diffence})
			lastPrecipitation = p
			lastTime = t.minute

	#for d in dataInInterval:
	# print("Precipitation:{}, time:{}".format(round(d[0],2),d[1]))
	print("Por minutos ha terminado")
	


def calculateSchedule(data,arr):
	if(len(arr)>0):
		print("Arreglo no vacio")
		return None
	lastTime=0
	lastPrecipitation=0
	for _,_,p,t in data:
		if ( t.minute==0 ) and (lastTime != t.hour):
			diffence=p-lastPrecipitation if p-lastPrecipitation>0 else 0
			difference= p - lastPrecipitation
			arr.append([diffence,t])
			lastPrecipitation= p
			lastTime = t.hour
	print("por hora Ha finalizado")
	

def planifier(data,interval,arr1,arr2): 
	x1= Thread(target=intervalInMinutes, args=(data, interval, arr1))
	x2=Thread(target=calculateSchedule, args=(data, arr2))
	threads =[x1,x2]
	for i in range(len(threads)):
		threads[i].start()

	for i in range(len(threads)):
		threads[i].join()
