def printa(n):
    if(n == 1):
        return 1
    return n+printa(n-1)
print(printa(3))