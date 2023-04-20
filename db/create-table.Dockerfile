FROM amazon/aws-cli

COPY ./ /db
RUN chmod +x /db/create-table.sh

ENTRYPOINT ["/db/create-table.sh"]