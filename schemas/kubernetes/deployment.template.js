'use strict';

module.exports = {
    "apiVersion": "extensions/v1beta1",
    "kind": "Deployment",
    "metadata": {
        "name": "",
        "labels": ""
    },
    "spec": {
        "replicas": 0,
        "selector": {
            "matchLabels": ""
        },
        "template": {
            "metadata": {
                "name": "",
                "labels": {}
            },
            "spec": {
                "containers": [
                    {
                        "name": "",
                        "image": "",
                        "workingDir": "",
                        "command": [],
                        "args": [],
                        "env": [],
                        "volumeMounts": [
                            {
                                "mountPath": "/var/log/soajs/",
                                "name": "soajs_log_volume"
                            }
                        ]
                    }
                ],
                "volumes": [
                    {
                        "name": "soajs_log_volume",
                        "hostPath": {
                            "path": "/var/log/soajs/"
                        }
                    }
                ]
            }
        }
    }
};
