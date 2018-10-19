FROM python:2.7
MAINTAINER Alex
ENV DEPLOY_DIR /xiaoyao/

# 用aliyun的源替换原有的源
RUN echo "deb http://mirrors.aliyun.com/debian jessie main non-free contrib" > /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/debian jessie-updates main non-free contrib" >> /etc/apt/sources.list \
    && echo "deb http://mirrors.aliyun.com/debian-security jessie/updates main non-free contrib" >> /etc/apt/sources.list \
    && apt-get update \
    && mkdir -p ~/.pip \
    && echo "[global]" >  ~/.pip/pip.conf \
    && echo "timeout = 6000" >> ~/.pip/pip.conf \
    && echo "index-url = http://mirrors.aliyun.com/pypi/simple/\ntrusted-host = mirrors.aliyun.com" >> ~/.pip/pip.conf \
    && echo "[install]" >> ~/.pip/pip.conf \
    && echo "use-mirrors = true" >> ~/.pip/pip.conf \
    && echo "mirrors = http://mirrors.aliyun.com/pypi/simple/" >> ~/.pip/pip.conf \
    && echo "trusted-host = mirrors.aliyun.com" >>  ~/.pip/pip.conf
    

COPY ./* ${DEPLOY_DIR}

WORKDIR ${DEPLOY_DIR}
RUN apt-get update
RUN apt-get install -y -q python-pip
RUN pip install -r requirements.txt

RUN chmod 777 run.sh
EXPOSE 8080
CMD ["/bin/sh","run.sh"]