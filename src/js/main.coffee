'use strict';

app = new Vue(
    el: '#app'
    data:
        night: false
        charCount: 80
        emptyList: true
        todoText: null
        todos: []
    watch:
        todoText: (val) ->
            @charCount = 80 - @todoText.trim().length
            @changeCountColor()
            return
    methods:
        addTodo: () ->
            if @todoText != null and @todoText != "" and @charCount > -1
                if @todoText.indexOf(":") == 0 and @todoText.split(" ").length > 1
                    arr = @todoText.split(" ")
                    switch arr[0]
                        when ":delete"
                            switch arr[1]
                                when "all" then @todos = []
                                when "last" then @todos.shift()
                                when "done" then @todos = @todos.filter (item) -> !item.done
                                when "undone" then @todos = @todos.filter (item) -> item.done
                        when ":set"
                            if @todoText.indexOf("all done") == 5
                                @todos.map (item) -> item.done = true
                            else if @todoText.indexOf("all undone") == 5
                                @todos.map (item) -> item.done = false
                            else if @todoText.indexOf("all counter") == 5
                                @todos.map (item) -> item.done = !item.done
                        else
                            @todos.unshift text: @todoText.trim(), done: false

                    @todoText = ""
                    return
                else
                    @todos.unshift text: @todoText.trim(), done: false
                    @emptyList = false if @emptyList
                    @todoText = ""
            return
        changeCountColor: () ->
            if @charCount < 0
                document.getElementById("count").style["color"] = "#ff3535"
            else
                if !@night
                    document.getElementById("count").style["color"] = "#000000"
                else
                    document.getElementById("count").style["color"] = "#ffffff"
            return
        check: (todo) ->
            todo.done = !todo.done
            return
        applyDayColors: () ->
            body = document.getElementsByTagName("body")[0]
            body.style["background-color"] = "#ffffff"
            body.style["color"] = "#000000"

            count = document.getElementById("count")
            if @charCount > -1 then count.style["color"] = "#000000" else count.style["color"] = "#ff3535"

            todoItems = document.getElementsByClassName("todo-item")

            for i in [0...todoItems.length]
                todoItems.item(i).style["background-color"] = "#afafaf"
                todoItems.item(i).style["color"] = "#000000"
                todoItems.item(i).style["border"] = "0"
            return
        applyNightColors: () ->
            body = document.getElementsByTagName("body")[0]
            body.style["background-color"] = "#262626"
            body.style["color"] = "#ffffff"

            count = document.getElementById("count")
            if @charCount > -1 then count.style["color"] = "#ffffff" else count.style["color"] = "#ff3535"

            todoItems = document.getElementsByClassName("todo-item")

            for i in [0...todoItems.length]
                todoItems.item(i).style["background-color"] = "#424242";
                todoItems.item(i).style["color"] = "#ffffff";
                todoItems.item(i).style["border"] = "0";
            return
)

changeMod = () ->
    if app.night
        app.night = false
        document.getElementById("mod").innerHTML = "<i id=\"mod-icon\" class=\"fa fa-moon-o\"></i>"
        app.applyDayColors()
    else
        app.night = true
        document.getElementById("mod").innerHTML = "<i id=\"mod-icon\" class=\"fa fa-sun-o\"></i>"
        app.applyNightColors()
    return

document.getElementById("mod").addEventListener "click", changeMod

app.$watch 'todos', (newVal, oldVal) ->
    if @night then @applyNightColors() else @applyDayColors()
    return