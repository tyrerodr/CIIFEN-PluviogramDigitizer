import numpy as np
import pandas as pd
from digitalizacion import timeFormat


#data: List [x,y,precipitation,time in minutes]
def crudeDataClean(data):
	data= np.asanyarray(data)
	df= pd.DataFrame(data, columns=['x','y','precipitation','minutes'])
	#df=df.drop_duplicates('minutes')
	#df=df.sort_values('minutes')
	print(df)
	#for i in range(0,df.shape[0],10)

	return df



#def dataInMinutes(data):