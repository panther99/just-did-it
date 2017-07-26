'use strict';

var app = new Vue({
    el: '#app',
    data: {
        night: false,
        charCount: 80,
        emptyList: true,
        todoText: null,
        todos: []
    },
    watch: {
        todoText: function(val) {
            this.charCount = 80 - this.todoText.trim().length;
            this.changeCountColor();
        }
    },
    methods: {
        addTodo: function() {
            if (this.todoText !== null && this.todoText !== "" && this.charCount > -1) {
                if (this.todoText.indexOf(":") === 0 && this.todoText.split(" ").length > 1) {
                    var arr = this.todoText.split(" ");
                    switch (arr[0]) {
                        case ":delete":
                            switch (arr[1]) {
                                case "all": this.todos = []; break;
                                case "last": this.todos.shift(); break;
                                case "done": this.todos = this.todos.filter(function(item) {
                                    return !item.done;
                                }); break;
                                case "undone": this.todos = this.todos.filter(function(item) {
                                    return item.done;
                                }); break;
                            }
                            break;
                        case ":set":
                            if (this.todoText.indexOf("all done") === 5) {
                                this.todos.map(function(item) {
                                    item.done = true;
                                });
                            }
                            else if (this.todoText.indexOf("all undone") === 5) {
                                this.todos.map(function(item) {
                                    item.done = false;
                                });
                            }
                            else if (this.todoText.indexOf("all counter") === 5) {
                                this.todos.map(function(item) {
                                    item.done = !item.done;
                                });
                            }
                            break;
                        default:
                            this.todos.unshift({ text: this.todoText.trim(), done: false });
                    }

                    this.todoText = "";
                } else {
                    this.todos.unshift({ text: this.todoText.trim(), done: false });

                    if (this.emptyList) {
                        this.emptyList = false;
                    }

                    this.todoText = "";
                }
            }
        },
        changeCountColor: function() {
            if (this.charCount < 0) {
                document.getElementById("count").style["color"] = "#ff3535";
            } else {
                if (!this.night) {
                    document.getElementById("count").style["color"] = "#000000";
                } else {
                    document.getElementById("count").style["color"] = "#ffffff";
                }
            }
        },
        check: function(todo) {
            todo.done = !todo.done;
        },
        applyDayColors: function() {
            var body = document.getElementsByTagName("body")[0];
            body.style["background-color"] = "#ffffff";
            body.style["color"] = "#000000";

            if (this.charCount > -1) {
                document.getElementById("count").style["color"] = "#000000";
            } else {
                document.getElementById("count").style["color"] = "#ff3535";
            }

            var todoItems = document.getElementsByClassName("todo-item");

            for (var i = 0; i < todoItems.length; i++) {
                todoItems.item(i).style["background-color"] = "#afafaf";
                todoItems.item(i).style["color"] = "#000000";
                todoItems.item(i).style["border"] = "0";
            }
        },
        applyNightColors: function() {
            var body = document.getElementsByTagName("body")[0];
            body.style["background-color"] = "#262626";
            body.style["color"] = "#ffffff";

            if (this.charCount > -1) {
                document.getElementById("count").style["color"] = "#ffffff";
            } else {
                document.getElementById("count").style["color"] = "#ff3535";
            }

            var todoItems = document.getElementsByClassName("todo-item");

            for (var i = 0; i < todoItems.length; i++) {
                todoItems.item(i).style["background-color"] = "#424242";
                todoItems.item(i).style["color"] = "#ffffff";
                todoItems.item(i).style["border"] = "0";
            }
        }
    }
});

var changeMod = function() {
    if (app.night) {
        app.night = false;
        document.getElementById("mod").innerHTML = "<i id=\"mod-icon\" class=\"fa fa-moon-o\"></i>";
        app.applyDayColors();
    } else {
        app.night = true;
        document.getElementById("mod").innerHTML = "<i id=\"mod-icon\" class=\"fa fa-sun-o\"></i>";
        app.applyNightColors();
    }
}

document.getElementById("mod").addEventListener("click", changeMod);

app.$watch('todos', function (newVal, oldVal) {
    if (this.night) {
        this.applyNightColors();
    } else {
        this.applyDayColors();
    }
});