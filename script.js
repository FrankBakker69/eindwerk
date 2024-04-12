body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}

#game-container {
    position: relative;
    width: 300px; 
    height: 200px; 
    margin: 50px auto;
    border: 2px solid black;
}

#ball {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    left: 30px;
    top: 30px;
}

#goal {
    width: 30px;
    height: 30px;
    background-color: green;
    position: absolute;
}

.obstacle {
    width: 30px;
    height: 30px;
    background-color: blue;
    position: absolute;
}
