FROM ubuntu:latest
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install curl unzip -y
RUN curl -fsSL https://bun.sh/install | bash
COPY ./bun /ctfserver/bun
COPY ./server /ctfserver/server
RUN cd /ctfserver/bun && bun run build
CMD ["bun /ctfserver/bun/build"]