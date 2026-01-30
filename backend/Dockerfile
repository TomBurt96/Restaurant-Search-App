#use python image as base
FROM python:latest

#create directory for backend
RUN mkdir -p /backend
WORKDIR /backend

#Copy directory into backend
COPY . ./

#add environment packages
RUN apt-get update && apt-get install -y \
netcat-openbsd \
binutils \
libproj-dev \
gdal-bin \
libgdal-dev \
python3-gdal \
&& rm -rf /var/lib/apt/lists/*

#install pipenv for virtual environment
RUN pip install -U pipenv

RUN pipenv sync --system

EXPOSE 8000

#Run Command
CMD ["./init.sh"]
