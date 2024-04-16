FROM ubuntu:latest
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl unzip -y
RUN curl -fsSL https://bun.sh/install | bash
COPY ./bun /ctfserver/bun
COPY ./server /ctfserver/server
CMD ["/bin/bash", "-c", "source /root/.bashrc && /bin/bash"]