FROM mongo

COPY collections /collections

ADD mongoimport.sh /

CMD ["/mongoimport.sh"]