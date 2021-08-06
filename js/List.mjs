class List {

    constructor (){
        this.selector;
        this.list = [];
        this.id;
    }

    loadData() {
        if (localStorage.length !== 0) {
            //get data
            //let temp = []; -> obj.list
            //get Local Storage
            //this.list.push(localStorage);
            
            //function getKeys() {
            for (var i = 0; i < localStorage.length; i++) {
                let key;
                key = localStorage.key(i);
                this.list.push(JSON.parse(localStorage[key]));
            }
            //Sort array list by id
            this.list.sort((a, b) => (a.id > b.id)? 1 : -1);

            //append to html
            this.list.forEach(el => {
               this.injectHtml(el.id, el.task, el.isCompleted);
            });
        }
        else {
            this.id = 0;
        }
    }

    create(_task) {

        this.id = (this.list.length == '')? this.id : this.list[this.list.length - 1].id + 1;
        let temp = {
            id: this.id,
            task: _task,
            isCompleted: 0
        };
        this.list.push(temp);
        localStorage.setItem(temp.id, JSON.stringify(temp));
        this.injectHtml(temp.id, temp.task, temp.isCompleted);
    }

    delete(_id){
        this.list.splice(_id, 1);
        localStorage.removeItem(_id);
    }

    modify(_id){
        
        //loop and find index
            //console.log(this.list);
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id == _id) {
                    //console.log(i);


                    let isCompleted = (this.list[i].isCompleted == 0)? 1 : 0;
                    //update local array
                    this.list[i].isCompleted = isCompleted;

                    //update bd
                    localStorage.setItem(_id, JSON.stringify(this.list[i]));


                } 
            }
    }   

    injectHtml(_id, _task, _isCompleted) {
        let checked = (_isCompleted == 1)? 'checked' : '';
        let lineThrough = (_isCompleted == 1)? 'completed' : '';
        $( this.selector ).append( `
        <div class="item ${lineThrough}" id=${_id}>
            <div class="check"><input type="checkbox" ${checked}></div>
            <div class="task">${_task}</div>
            <div class="button"><button class="btn"><i class="fa fa-trash"></i></button></div>
        </div>
        <hr>
        ` );
    }
}