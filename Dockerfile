FROM python:2.7
MAINTAINER Alex
ENV DEPLOY_DIR /blended_learning

RUN apt-get update
RUN apt-get install -y -q python-pip

COPY . ${DEPLOY_DIR}

RUN pip install -r ${DEPLOY_DIR}/requirements.txt

WORKDIR ${DEPLOY_DIR}
RUN chmod 777 run.sh
EXPOSE 8080
CMD ["/bin/sh","run.sh"]