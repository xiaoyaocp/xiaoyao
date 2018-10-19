FROM python:2.7
MAINTAINER Alex
ENV DEPLOY_DIR /xiaoyao

COPY ./* ${DEPLOY_DIR}

WORKDIR ${DEPLOY_DIR}
RUN apt-get update
RUN apt-get install -y -q python-pip
RUN pip install -r requirements.txt

RUN chmod 777 run.sh
EXPOSE 8080
CMD ["/bin/sh","run.sh"]