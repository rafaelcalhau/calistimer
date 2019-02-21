import React, { Component } from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'

class Selector extends Component {
    state = {
        selected: []
    }

    componentDidMount() {
        if (this.props.selected) {
            this.setState({ selected: this.props.selected })
        }
    }
  
    handlePress = (option) => {

        const { selected } = this.state

        if (Array.isArray(selected)) {
            const pos = selected.indexOf(option)

            if (this.props.multiple)
            {
                if (pos === -1) {
                
                    if (this.props.uniqueValue && option === this.props.uniqueValue) {
                        this.setState({ selected: [option] }, () => {
                            this.parentOnSelect(option)
                        })
                    } else {
                        const offPos = selected.indexOf(-1)

                        if (offPos !== -1) {
                            selected.splice(offPos, 1)
                            this.setState({ selected: [...selected, option] }, () => {
                                this.parentOnSelect(option)
                            })
                        } else {
                            this.setState({ selected: [...selected, option] }, () => {
                                this.parentOnSelect(option)
                            })
                        }
                    }

                } else {

                    selected.splice(pos, 1)

                    this.setState({ selected }, () => {
                        this.parentOnSelect(option)
                    })

                }
            } else {
                this.setState({ selected }, () => {
                    this.parentOnSelect(option)
                })
            }
            
        } else {
            this.setState({ selected: option }, () => {
                this.parentOnSelect(option)
            })
        }

    }

    isSelected = (option) => {
        const { selected } = this.state
        let result
        
        if (selected !== null && Array.isArray(selected)) {
            result = (selected.indexOf(option) !== -1)
        } else {
            result = (selected === option)
        }

        return result
    }

    parentOnSelect = (option) => {
        if (this.props.onSelect) {
            this.props.onSelect(this.state.selected)
        }
    } 
  
    render () {
      const { options } = this.props
  
      return(
        <View style={styles.selector}>
            <View style={styles.optionsGroup}>
                {
                    Object.keys(options).map( key => {
                        return (
                            <TouchableOpacity 
                                key={ key }
                                onPress={ () => this.handlePress(options[key].value) }
                                style={[ styles.option, (this.isSelected(options[key].value) ? styles.optionSelected : '') ]}>
                                <Text style={styles.optionLabel}>{ options[key].text }</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {/* <Text>{ JSON.stringify(this.state) }</Text> */}
        </View>
      )
    }
  }
  
const styles= StyleSheet.create({
    selector: {
        alignItems: 'center',
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center'
    },
    optionsGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    option: {
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        margin: 10
    },
    optionLabel: {
        fontSize: 18,
        textAlign: 'center'
    },
    optionSelected: {
        backgroundColor: 'rgba(255, 255, 255, .5)'
    },
})

export default Selector