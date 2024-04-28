FROM node:18-alpine

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com
RUN npm install express

COPY /src /app
COPY readflag /readflag
COPY flag /flag

RUN chown root:root /flag /readflag
RUN chmod 400 /flag
RUN chmod u+s /readflag
RUN chmod u+x /readflag

RUN adduser d3ctf -D -s /bin/sh
RUN echo -e "1ae81cef1973\n1ae81cef1973" | passwd root
RUN echo -e "1ae81cef1973\n1ae81cef1973" | passwd d3ctf
USER d3ctf

CMD node app.js
