import os
os.system('you-get -o ~/Downloads/js  --format=dash-flv  https://www.bilibili.com/video/BV1Zy4y1K7SH\?p\=4\&vd_source\=883f98b8a355cf142f364e9776c1674e')
count = 168
while (count < 169):
   os.system('you-get -o ~/Downloads/js  --format=dash-flv  https://www.bilibili.com/video/BV1Zy4y1K7SH\?p\='+str(count)+'\&vd_source\=883f98b8a355cf142f364e9776c1674e')
   count = count + 1
 
print( "Good bye!")