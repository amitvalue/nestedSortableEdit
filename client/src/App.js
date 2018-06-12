import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import DragSortableList from 'react-drag-sortable';
import axios from 'axios';
import {connect} from 'react-redux';
import Nestable from 'react-nestable';

// import EditableLabel from 'react-inline-editing';
// import InlineEdit from 'react-edit-inline';




// var placeholder = (
//     <div className="placeholderContent"> DROP HERE ! </div>
// );

// var list = [
//  	{content: (<h1>test1</h1>)},
//  	{content: (<h2>test2</h2>)},
//  	{content: (<h3>test3</h3>)},
//  	{content: (<h1>test4</h1>)}
// ];



 // var onSort = function(sortedList) {
 // 	console.log("sortedList", sortedList);
 // }
 //
//  const items = [
//     { id: 0, text: 'Andy' },
//     {
//       id: 1, text: 'Harry',
//       children: [
//         { id: 2, text: 'David',
//           children: [{ id: 3, text: 'Test' }]
//         }
//       ]
//     },
//     { id: 4, text: 'Lisa' }
// ];

const renderItem = ({ item }) => {
    return item.content;
};

// const getData = (items, item) => {
//   console.log({ items, item })
//   axios.post("http://localhost:3001/saveContent",{"url":this.state.url,"content":items})
//   .then((contentSaved)=>{
//     console.log(contentSaved.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// }




class App extends Component {

  constructor(props){
    super(props);
    this.state = { inputValue: '' };
  }


  // _handleFocus(text) {
  //     console.log('Focused with text: ' + text);
  // }
  //
  // _handleFocusOut(text) {
  //     console.log('Left editor with text: ' + text);
  //     console.log(this.state.testReducer);
  // }


  onFocus(params,event){
    console.log(params);
    console.log(event.target);

    params.map( (item,i)=>{
        if(params[i].id == event.target.id){
          params[i].text = event.target.value;
          params[i].content = React.createElement('input', {
                            type: 'text',
                            defaultValue: event.target.value,
                            id:params[i].id,
                            onBlur: this.onFocus.bind(this,params)
                          });
            // break;
        }
        else if(params[i].children.length > 0){
          item.children.map( (child,j)=>{
            if(params[i].children[j].id == event.target.id){
              params[i].children[j].text = event.target.value;
              params[i].children[j].content = React.createElement('input', {
                                type: 'text',
                                defaultValue: event.target.value,
                                id:params[i].children[j].id,
                                onBlur: this.onFocus.bind(this,params)
                              });
              // break;
            }
          })
        }
    })

    this.props.dispatch({
      type:'GET_CONTENT',
      data:params
    });

  }



  getData = (items, item) => {
    console.log({ items, item })

    this.props.dispatch({
      type:'GET_CONTENT',
      data:items
    });
  }

  sendUrl(){
    axios.post("http://localhost:3001/getContentFromUrl",{"url":this.getUrl.value})
    .then((urlResponse)=>{
      // console.log("urlResponse",urlResponse);
      urlResponse.data.content.map((item,i) => {
        if(item.children.length > 0){
          item.children.map((child,j)=>{
            // child.content = <EditableLabel text={child.content}
            //         labelClassName='myLabelClass'
            //         inputClassName='myInputClass'
            //         inputWidth='200px'
            //         inputHeight='25px'
            //         inputMaxLength='100'
            //         labelFontWeight='nornal'
            //         inputFontWeight='normal'
            //         onFocus={this._handleFocus.bind(this)}
            //         onFocusOut={this._handleFocusOut.bind(this)}
            //     />
            child.text = child.content;
            child.content =  React.createElement('input', {
                              type: 'text',
                              defaultValue: child.content,
                              id:child.id,
                              onBlur: this.onFocus.bind(this,urlResponse.data.content)
                            });

          })
        }
        // item.content = <EditableLabel text={item.content}
        //         labelClassName='myLabelClass'
        //         inputClassName='myInputClass'
        //         inputWidth='200px'
        //         inputHeight='25px'
        //         inputMaxLength='100'
        //         labelFontWeight='bold'
        //         inputFontWeight='bold'
        //         onFocus={this._handleFocus.bind(this)}
        //         onFocusOut={this._handleFocusOut.bind(this)}
        //     />
        item.text = item.content;
        item.content =  React.createElement('input', {
                          type: 'text',
                          defaultValue: item.content,
                          id:item.id,
                          onBlur: this.onFocus.bind(this,urlResponse.data.content)
                        });
        urlResponse.data.content[i].content = item.content;
      })
      //
      // urlResponse.data.content.map((item,i) => {
      //   if(urlResponse.data.content[i].children.length > 0){
      //     item.children.map((child,j)=>{
      //       urlResponse.data.content[i].children[j].text = urlResponse.data.content[i].children[j].content;
      //       urlResponse.data.content[i].children[j].content =  React.createElement('input', {
      //                         type: 'text',
      //                         defaultValue: urlResponse.data.content[i].children[j].content,
      //                         id:urlResponse.data.content[i].children[j].id,
      //                         onChange: this.onFocus.bind(this,urlResponse.data.content)
      //                       });
      //
      //     })
      //   }
      //   urlResponse.data.content[i].text = urlResponse.data.content[i].content;
      //   urlResponse.data.content[i].content =  React.createElement('input', {
      //                     type: 'text',
      //                     defaultValue: urlResponse.data.content[i].content,
      //                     id:urlResponse.data.content[i].id,
      //                     onChange: this.onFocus.bind(this,urlResponse.data.content)
      //                   });
      //   // urlResponse.data.content[i].content = urlResponse.data.content[i].content;
      // })
      // console.log("urlResponse",urlResponse);
      this.props.dispatch({
        type:'GET_CONTENT',
        data:urlResponse.data.content
      });

    })

  }

  render() {
    return (
      <div className="App">


        <div>Enter Url:<input type="text" defaultValue="https://scotch.io/bar-talk/getting-started-with-redux-an-intro" ref={(input)=>this.getUrl = input} /><input type="button" value="submit" onClick={this.sendUrl.bind(this)}/></div>



        <Nestable
            items={this.props.content?this.props.content:null}
            renderItem={renderItem}
            onChange={this.getData}
        />
      {JSON.stringify(this.props.content?this.props.content:null)}

    </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps",state);
    return {
        content: state.testReducer
    }
}


export default connect(mapStateToProps)(App);
