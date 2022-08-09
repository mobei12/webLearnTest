import os

count = 142
while (count < 143):
   os.system('you-get -o ~/Downloads/js  --format=dash-flv  https://www.bilibili.com/video/BV1bS4y1b7NV\?p\='+str(count)+'\&vd_source\=883f98b8a355cf142f364e9776c1674e')
   count = count + 1
 
print( "Good bye!")