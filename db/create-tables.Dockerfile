FROM localstack/localstack

COPY ./ /db
RUN chmod +x /db/docker_entrypoint.sh

ENTRYPOINT [ "/db/docker_entrypoint.sh" ]
