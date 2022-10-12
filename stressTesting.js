class Stress {
    constructor(url, model) {
        this.model = model;
        this.url = url;
    }

    attach(ele) {
        this.ele = document.createElement('div');
        this.ele.className = 'box';
        ele.append(this.ele);
    }

    onmessage(info) {
        if (info.notifyEmail == this.model.notifyEmail &&
            info.job.modelName == this.model.name) {
            if ('err' in info) {
                throw "" + info.err;
            }
            else if (info.msg == '完成訓練') {
                var endTime = info.job.endTime;
                var startTime = info.job.startTime;
                var spendTime = parseInt((endTime - startTime) / 1000);
                this.ele.innerHTML = "完成訓練，花費：" + spendTime + " sec";
            } else {
                var msg = 'JobHome: ' + info.job.home + ' ,Model Name: ' + info.job.modelName + " , " + info.msg;
                this.ele.innerHTML = msg;
                //console.log(info);
            }
        }
    }

    start() {
        this.ele.innerHTML = "Start...";
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

        fetch(this.url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(this.model)
        })
            .then(response => {
                if (response.status != 200) throw "Job Service Unavailable";
                response.json();
            })
            .then(info => {
                if (info != undefined) {
                    console.log(info);
                    var msg = 'JobHome: ' + info.job.home + ' , Model Name: ' + info.job.modelName + " , starting...";
                    this.ele.innerHTML = msg;//">>>" + JSON.stringify(info);
                }
            })
            .catch((error) => {
                this.ele.innerHTML = "發生錯誤：" + error;
            });
    }
}