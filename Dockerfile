FROM oven/bun:latest
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install curl unzip -y
COPY ./web /ctfserver/web
COPY ./server /ctfserver/server
RUN cd /ctfserver/web && bun i && bun run build
RUN cd /ctfserver/server && bun i
COPY ./start.bash /
CMD ["bash","/start.bash"]
#docker build -t ctf . && docker run -d -p 4000:3000 -p 4001:3001 ctf 