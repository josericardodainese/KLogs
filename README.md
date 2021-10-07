# KLogs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.


## How to get data to fill the settings

### Cluster Server (Fill In `Cluster Remote Address`)
```shell
kubectl config view -o jsonpath="{.clusters[?(@.name==\"docker-desktop\")].cluster.server}"
```

### Token (Fill In `Auth Token`)
```shell
kubectl get secrets -o jsonpath="{.items[?(@.metadata.annotations['kubernetes\.io/service-account\.name']=='default')].data.token}" | base64 -d
```
