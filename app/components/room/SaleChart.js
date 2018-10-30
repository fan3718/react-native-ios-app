import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
 
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const { unitWidth,width} = Dimensions.get('window');
export default class SaleChart extends Component {
 
  constructor(props) {
      super(props);
  }
  shouldComponentUpdate(nextProps) {
    if(nextProps.data === this.props.data) {
        return false
    }
    return true
  }

  render() {
      let { data } = this.props
      let value =  data || {}
    const option = {
        // backgroundColor: '#2c343c',
        // title : {
        //     text: '南丁格尔玫瑰图',
        //     subtext: '纯属虚构',
        //     x:'center'
        // },
        tooltip : {
            trigger: 'item',
            formatter: "{d}%"
        },
        legend: {
            // x : 'right',
            // y : 'bottom',
            right: 20,
            // top: 20,
            bottom: 20,
            orient: 'vertical',
            formatter: '{name}',
            data:[{name:'已完成额度',icon: '',textStyle:{
                color: '#c3b06d',
            }}, 
            // { name:'预约额度',textStyle:{
            //     color: '#b9925f',
            // }}, 
            { name:'未完成额度',textStyle:{
                color: '#cccccc',
            }},],
        },
        calculable : true,
        series : [
            {
                type:'pie',
                radius: [ 25, 35],
                center : ['50%', '45%'],
                silent: true,
                data:[
                    {itemStyle:{  
                        normal: {
                            color: '#f2f2f2',
                        } 
                    }
                },
                ]
            },
            {
                type:'pie',
                radius : [ 40, 90 ],
                center : ['50%', '45%'],
                roseType : 'radius',
                markPoint: {
                    symbol: 'circle'
                },
                label:{            //饼图图形上的文本标签
                    normal:{
                        show:true,
                        // position:'inner', //标签的位置
                        textStyle : {
                            fontWeight : 300 ,
                            fontSize : 16    //文字的字体大小
                        },
                        formatter:'{c}万'
                    }
                },
                data:[
                    {value: value['sign'] || 300, name:'已完成额度',itemStyle:{  
                        normal: {
                            color: '#c3b06d',
                            label: {textStyle:{color: '#333333'}}
                        } 
                    }},
                    // {value: 80, name:'预约额度',itemStyle:{  
                    //     normal: {
                    //         color: '#b9925f',
                    //         label: {textStyle:{color: '#333333'}}
                    //     } 
                    // }},
                    {value: (value['target'] - value['sign']) >0 ? (value['target'] - value['sign']) : 0 , name:'未完成额度',itemStyle:{  
                        normal: {
                            color: '#cccccc',
                            label: {textStyle:{color: '#333333'}}
                        } 
                    }},
                ]
            }
        ]
    };
    
  return (
      <View style={styles.container}>

        <Echarts style={{top: 0, left: 0 }} option={option} height={250} width = {'100%'}/>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor: 'red'
  },
});
