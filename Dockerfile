FROM oven/bun:latest
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install curl unzip -y
COPY ./bun /ctfserver/bun
COPY ./server /ctfserver/server
RUN cd /ctfserver/bun && bun run build
COPY ./start.bash /
CMD ["bash","/start.bash"]
#docker build -t ctf . && docker run -d -p 4000:3000 -p 4001:3001 ctf 