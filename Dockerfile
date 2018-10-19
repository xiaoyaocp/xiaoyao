FROM python:2.7
MAINTAINER Alex

RUN apt-get update
RUN apt-get install -y -q python-pip
RUN pip install setuptools
RUN pip install Django==1.9.9
ADD ../xiaoyao /opt/

WORKDIR /opt/xiaoyao
RUN python setup.py install

WORKDIR /opt/xiaoyao
RUN chmod 777 run.sh
EXPOSE 8080
CMD ["/bin/sh","run.sh"]