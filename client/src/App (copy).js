import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import DragSortableList from 'react-drag-sortable';
import axios from 'axios';
import {connect} from 'react-redux';
// import ReactHtmlParser from 'react-html-parser';
import $ from "jquery";



var placeholder = (
    <div className="placeholderContent"> DROP HERE ! </div>
);

// var list = [
//  	{content: (<h1>test1</h1>)},
//  	{content: (<h2>test2</h2>)},
//  	{content: (<h3>test3</h3>)},
//  	{content: (<h1>test4</h1>)}
// ];



 // var onSort = function(sortedList) {
 // 	console.log("sortedList", sortedList);
 // }




class App extends Component {

  componentDidMount(){
    // $("body").on("dblclick",".draggable",function(){
    //   // alert( $(this).text() );
    //
    //   $(".changeText").val($(this).text());
    // });
    //
    var tt = this.refs.DragSortableList;
    // console.log(tt);
    this.changeTextFunc = this.changeTextFunc.bind(this);
    // this.$el.on('click', '.draggable', this.changeTextFunc);

  }

  onSort = function(sortedList,dropEvent) {
  	console.log("sortedList", sortedList,dropEvent.target.innerText);

    let currentEleHeadingStart,prevEleHeadingStart,nextEleHeadingStart;
    let currentHeaderNumber,prevHeaderNumber,nextHeaderNumber;
    // console.log(this.props);
    sortedList.map((item,i) =>{
      console.log(item);
      if(item.content===dropEvent.target.innerText){
        console.log(i);
        switch(i) {
          case 0:
              console.log("min")

              console.log(item.content);
              currentEleHeadingStart = item.content.search('h');
              currentHeaderNumber = item.content.substring(currentEleHeadingStart+1,currentEleHeadingStart+2);
              console.log(currentEleHeadingStart,currentHeaderNumber);

              console.log(sortedList[1].content);
              nextEleHeadingStart = sortedList[1].content.search('h');
              nextHeaderNumber = sortedList[1].content.substring(nextEleHeadingStart+1,nextEleHeadingStart+2);
              console.log(nextEleHeadingStart,nextHeaderNumber);

              if(parseInt(currentHeaderNumber) !== parseInt(nextHeaderNumber))
              {
                item.content = item.content.replace(item.content.substring(1,currentEleHeadingStart+2), sortedList[1].content.substring(1,nextEleHeadingStart+2));
                item.content = item.content.replace('</h'+currentHeaderNumber,'</h'+nextHeaderNumber);
              }
              console.log(item.content);
              console.log("min")
              break;
          case sortedList.length-1:
              console.log("max")

              console.log(item.content);
              currentEleHeadingStart = item.content.search('h');
              currentHeaderNumber = item.content.substring(currentEleHeadingStart+1,currentEleHeadingStart+2);
              console.log(currentEleHeadingStart,currentHeaderNumber);

              sortedList[sortedList.length-2].content;
              prevEleHeadingStart = sortedList[sortedList.length-2].content.search('h');
              prevHeaderNumber = sortedList[sortedList.length-2].content.substring(prevEleHeadingStart+1,prevEleHeadingStart+2);
              console.log(prevEleHeadingStart,prevHeaderNumber);

              if(parseInt(currentHeaderNumber) !== parseInt(prevHeaderNumber))
              {
                item.content = item.content.replace(item.content.substring(1,currentEleHeadingStart+2), sortedList[sortedList.length-2].content.substring(1,prevEleHeadingStart+2));
                item.content = item.content.replace('</h'+currentHeaderNumber,'</h'+prevHeaderNumber);
              }
              console.log(item.content);
              console.log("max")
              break;
          default:
              console.log("middle")
              console.log(item.content);
              currentEleHeadingStart = item.content.search('h');
              currentHeaderNumber = item.content.substring(currentEleHeadingStart+1,currentEleHeadingStart+2);
              console.log(currentEleHeadingStart,currentHeaderNumber);

              console.log(sortedList[i-1].content);
              prevEleHeadingStart = sortedList[i-1].content.search('h');
              prevHeaderNumber = sortedList[i-1].content.substring(prevEleHeadingStart+1,prevEleHeadingStart+2);
              console.log(prevEleHeadingStart,prevHeaderNumber);


              console.log(sortedList[i+1].content);
              nextEleHeadingStart = sortedList[i+1].content.search('h');
              nextHeaderNumber = sortedList[i+1].content.substring(nextEleHeadingStart+1,nextEleHeadingStart+2);
              console.log(nextEleHeadingStart,nextHeaderNumber);

              if(parseInt(nextHeaderNumber) - parseInt(prevHeaderNumber) >= 2){

                item.content = item.content.replace(item.content.substring(1,currentEleHeadingStart+2), sortedList[i-1].content.substring(1,prevEleHeadingStart+2));
                // item.content = item.content.replace('<h'+currentHeaderNumber,'<h'+(parseInt(prevHeaderNumber)+1));
                item.content = item.content.replace('</h'+currentHeaderNumber,'</h'+(parseInt(prevHeaderNumber)+1));
              }
              else if(parseInt(nextHeaderNumber) - parseInt(prevHeaderNumber) <= 1){
                item.content = item.content.replace(item.content.substring(1,currentEleHeadingStart+2), sortedList[i-1].content.substring(1,prevEleHeadingStart+2));
                // item.content = item.content.replace('<h'+currentHeaderNumber,'<h'+prevHeaderNumber);
                item.content = item.content.replace('</h'+currentHeaderNumber,'</h'+prevHeaderNumber);
              }

              console.log("middle")
      }



        return true;
      }
      else{
        return false
      }
    })

    this.props.dispatch({
      type:'GET_CONTENT',
      data:sortedList
    });
  }
  sendUrl(){
    axios.post("http://localhost:3001/getContentFromUrl",{"url":this.getUrl.value})
    .then((urlResponse)=>{
      // console.log(urlResponse);
      // urlResponse.data.content.map((item,i) => {
      //   // console.log(i,ReactHtmlParser(item.content));
      //   urlResponse.data.content[i].content = ReactHtmlParser(item.content)
      // })
      // console.log(urlResponse);
      this.props.dispatch({
        type:'GET_CONTENT',
        data:urlResponse.data.content
      });

    })

  }

  changeTextFunc(){
    // console.log(this.props.content);
    console.log("hoche");
    // console.log("asche",this.changeText.value);
    // this.props.content[0].content = this.changeText.value;

    // console.log(this.props.content);
    // this.props.dispatch({
    //   type:'GET_CONTENT',
    //   data:this.props.content
    // });
  }
  render() {
    return (
      <div className="App">


        <div>Enter Url:<input type="text" defaultValue="https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1" ref={(input)=>this.getUrl = input} /><input type="button" value="submit" onClick={this.sendUrl.bind(this)}/></div>

        <DragSortableList ref="DragSortableList" items={this.props.content?this.props.content:null} placeholder={placeholder} onSort={this.onSort.bind(this)} dropBackTransitionDuration={0.3} type="vertical"/>
        <input type="text" className="changeText" ref={(input)=>this.changeText = input}/><input type="button" value="change text" onClick={this.changeTextFunc.bind(this)}/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
    return {
        content: state.testReducer
    }
}


export default connect(mapStateToProps)(App);
