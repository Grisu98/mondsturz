import math

# s(x)=((1)/(ceil(((1)/(6)) (sqrt(24 x+9)-3)))) x+(ceil(((1)/(6)) (sqrt(24 x+9)-3))-1)*1.5
# x/ceiling(1/6 (sqrt(24 x + 9) - 3)) + (ceiling(1/6 (sqrt(24 x + 9) - 3)) - 1)×1.5
# n_list = []
# for x in range(1,361):

#     n = math.ceil((math.sqrt(1 + 8 * x / 3) - 1) / 2)
#     n2 =  math.ceil(1/6 * (math.sqrt(24*x+9) - 3))

#     fn = (1/n)*x+(n-1)*1.5
#     print(n,n2)

# for i in range(0,16):
#     amnt = n_list.count(i)
#     #print(f"amnt: {amnt} of {i}")


def give_lvl(xp):
    n = math.ceil(1/6 * (math.sqrt(24*xp+9) - 3))
    fn = (1/n)*xp+(n-1)*1.5
    return fn



print((give_lvl(100)            +1)/3)
# for i in range(1,361):
#     print(give_lvl(i))