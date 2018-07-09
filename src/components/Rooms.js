'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import get from 'lodash/get'
import {
  Card,
  CardTitle,
  CardHeader,
  CardText,
  CardActions
} from 'material-ui/Card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table'

import {redA200, grey100} from 'material-ui/styles/colors'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import CircularProgress from 'material-ui/CircularProgress'
import AutoComplete from 'material-ui/AutoComplete'
import SearchIcon from 'material-ui/svg-icons/action/search'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import Cancel from 'material-ui/svg-icons/Navigation/cancel'
import PeopleIcon from 'material-ui/svg-icons/social/people'
import Person from 'material-ui/svg-icons/social/person'
import SleepingIcon from 'material-ui/svg-icons/notification/airline-seat-flat'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add-circle'
import ContentRemove from 'material-ui/svg-icons/content/remove-circle'

const FlexContainer = styled.div`
width: 50%;
margin-left: 10%;
margin-top: 10%;
`
const ButtonContainer = styled.div`
  margin: 0 auto;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  float: 'right';
`

const IconContainer = styled.div`
position: absolute;
top: 10px;
right: 8px;
`

const SelectWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

const styles = {
  textStyle: {
    color: '#293580',
    fontSize: '20px'
  }
}

class Rooms extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomCount: 2,
      adultCount: 7,
      childrenCount: 1,
      isAdultAddDisabled: false,
      isChildAddDisabled: false,
      isSubtractAdultCount: false,
      isSubtractChildCount: false
    }
  }

  componentDidMount () {
    let p1 = new Promise((resolve, reject) => {
      let {roomCount, adultCount, childrenCount} = this.state;
      roomCount = Math.abs(roomCount);
      adultCount = Math.abs(adultCount);
      childrenCount = Math.abs(childrenCount);

      if(roomCount >= 5 ) {
        roomCount = 5;
      }

      let totalAvailablePeople = adultCount + childrenCount;
      let maximumPossiblePeople = 4 * roomCount;
      let minimumPossiblePeople = roomCount;
      if (totalAvailablePeople > maximumPossiblePeople) {
        let difference = totalAvailablePeople - maximumPossiblePeople
        if (childrenCount >= difference) {
          let newChildrenCount = childrenCount - difference
          this.setState({
            roomCount: roomCount,
            adultCount: adultCount,
            childrenCount: newChildrenCount
          })
        } else {
          let newAdultCount = adultCount - (difference - childrenCount)
          this.setState({
            roomCount: roomCount,
            adultCount: newAdultCount,
            childrenCount: 0
          })
        }
      }

      if (totalAvailablePeople < minimumPossiblePeople) {
        let difference = roomCount - totalAvailablePeople
        let newAdultCount = adultCount + difference
        this.setState({
          roomCount: roomCount,
          adultCount: newAdultCount,
          childrenCount: childrenCount
        })
      }
    })
  }

  decreaseRoomCount = () => {
    let {roomCount, adultCount, childrenCount} = this.state
    let newRoomCount = roomCount - 1
    let totalAvailablePeople = adultCount + childrenCount
    let maximumPossiblePeople = 4 * newRoomCount
    if (totalAvailablePeople > maximumPossiblePeople) {
      let difference = totalAvailablePeople - maximumPossiblePeople
      if (childrenCount >= difference) {
        let newChildrenCount = childrenCount - difference
        this.setState({
          roomCount: newRoomCount,
          adultCount: adultCount,
          childrenCount: newChildrenCount,
          isAdultAddDisabled:true,
          isChildAddDisabled:true,
          isSubtractAdultCount:false,
          isSubtractChildCount:false
        })
      } else {
        let newAdultCount = adultCount - (difference - childrenCount)
        this.setState({
          roomCount: newRoomCount,
          adultCount: newAdultCount,
          childrenCount: 0,
          isAdultAddDisabled:true,
          isChildAddDisabled:true,
          isSubtractAdultCount:false,
          isSubtractChildCount:false
        })
      }
    } else {
      this.setState({
        roomCount: newRoomCount,
        adultCount: adultCount,
        childrenCount: childrenCount,
        isAdultAddDisabled:false,
        isChildAddDisabled:false,
        isSubtractAdultCount:false,
        isSubtractChildCount:false
      })
    }
  }

  increaseRoomCount = () => {
    let {roomCount, adultCount, childrenCount} = this.state
    // roomCount = Math.abs(roomCount);
    // adultCount = Math.abs(adultCount);
    // childrenCount = Math.abs(childrenCount);
    let newRoomCount = roomCount + 1
    let totalAvailablePeople = adultCount + childrenCount
    let maximumPossiblePeople = newRoomCount * 4
    if (totalAvailablePeople < newRoomCount) {
      let difference = newRoomCount - totalAvailablePeople
      let newAdultCount = adultCount + difference
      this.setState({
        roomCount: newRoomCount,
        adultCount: newAdultCount,
        childrenCount: childrenCount
      })
    } else if (totalAvailablePeople > maximumPossiblePeople) {
      let difference = totalAvailablePeople - maximumPossiblePeople
      if (childrenCount >= difference) {
        let newChildrenCount = childrenCount - difference
        this.setState({
          roomCount: newRoomCount,
          adultCount: adultCount,
          childrenCount: newChildrenCount,
          isAdultAddDisabled:true,
          isChildAddDisabled:true,
          isSubtractAdultCount:false,
          isSubtractChildCount:false
        })
      } else {
        let newAdultCount = adultCount - (difference - childrenCount)
        this.setState({
          roomCount: newRoomCount,
          adultCount: newAdultCount,
          childrenCount: 0,
          isAdultAddDisabled:true,
          isChildAddDisabled:true,
          isSubtractAdultCount:false,
          isSubtractChildCount:false
        })
      }
    } else {
      this.setState({
        roomCount: newRoomCount,
        adultCount: adultCount,
        childrenCount: childrenCount,
        isAdultAddDisabled: false,
        isChildAddDisabled: false
      })
    }
  }

  decreseAdultsCount = () => {
    let {roomCount, adultCount, childrenCount} = this.state
    let newAdultCount = adultCount - 1
    let minimumPossiblePeople = roomCount
    let totalAvailablePeople = newAdultCount + childrenCount
    let maximumPossiblePeople = roomCount * 4
    if (totalAvailablePeople < minimumPossiblePeople) {
      this.setState({
        isSubtractAdultCount: true,
        isSubtractChildCount: true,
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: childrenCount
      })
    } else if (totalAvailablePeople < maximumPossiblePeople) {
      this.setState({
        roomCount: roomCount,
        adultCount: newAdultCount,
        childrenCount: childrenCount,
        isAdultAddDisabled: false,
        isChildAddDisabled: false
      })
    } else {
      this.setState({
        roomCount: roomCount,
        adultCount: newAdultCount,
        childrenCount: childrenCount
      })
    }
  }

  increaseAdultsCount = () => {
    let {roomCount, adultCount, childrenCount} = this.state
    let maximumPossiblePeople = 4 * roomCount
    let newAdultCount = adultCount + 1
    let totalAvailablePeople = newAdultCount + childrenCount
    let minimumPossiblePeople = roomCount

    if (totalAvailablePeople > maximumPossiblePeople) {
      this.setState({
        isAdultAddDisabled: true,
        isChildAddDisabled: true,
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: childrenCount
      })
    } else if (totalAvailablePeople > minimumPossiblePeople) {
      this.setState({
        roomCount: roomCount,
        adultCount: newAdultCount,
        childrenCount: childrenCount,
        isSubtractAdultCount: false,
        isSubtractChildCount: false
      })
    } else {
      this.setState({
        roomCount: roomCount,
        adultCount: newAdultCount,
        childrenCount: childrenCount
      })
    }
  }

  decreaseChildCount = () => {
    let {roomCount, adultCount, childrenCount} = this.state
    let newChildrenCount = childrenCount - 1
    let minimumPossiblePeople = roomCount
    let totalAvailablePeople = adultCount + newChildrenCount
    let maximumPossiblePeople = roomCount * 4
    if (totalAvailablePeople < minimumPossiblePeople) {
      this.setState({
        isSubtractAdultCount: true,
        isSubtractChildCount: true,
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: childrenCount
      })
    } else if (totalAvailablePeople < maximumPossiblePeople) {
      this.setState({
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: newChildrenCount,
        isAdultAddDisabled: false,
        isChildAddDisabled: false
      })
    } else {
      this.setState({
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: newChildrenCount
      })
    }
  }

  increaseChildCount = () => {
    let {roomCount, adultCount, childrenCount} = this.state
    let maximumPossiblePeople = 4 * roomCount
    let newChildrenCount = childrenCount + 1
    let totalAvailablePeople = newChildrenCount + adultCount
    let minimumPossiblePeople = roomCount

    if (totalAvailablePeople > maximumPossiblePeople) {
      this.setState({
        isAdultAddDisabled: true,
        isChildAddDisabled: true,
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: childrenCount
      })
    } else if (totalAvailablePeople > minimumPossiblePeople) {
      this.setState({
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: newChildrenCount,
        isSubtractAdultCount: false,
        isSubtractChildCount: false
      })
    } else {
      this.setState({
        roomCount: roomCount,
        adultCount: adultCount,
        childrenCount: newChildrenCount
      })
    }
  }

  render () {
    const {
      roomCount,
      adultCount,
      childrenCount,
      isAdultAddDisabled,
      isChildAddDisabled,
      isSubtractAdultCount,
      isSubtractChildCount
    } = this.state

    return (
      <FlexContainer>
        <CardText style={styles.textStyle}>
          <i
            class='fa fa-users'
            style={{
              fontSize: '27px',
              color: 'rgb(41, 53, 128)',
              paddingRight: '16px'
            }}
          />
          Choose number of &nbsp;
          <b>people</b>
        </CardText>
        <Card>
          <SelectWrapper>
            <CardText style={{width: '70%'}}>
              <ul style={{listStyle: 'none'}}>
                <li style={{fontWeight: 800, color: 'rgb(41, 53, 128)'}}>
                  <i
                    className='fa fa-bed'
                    style={{
                      fontSize: '27px',
                      color: 'rgb(41, 53, 128)',
                      paddingRight: '16px'
                    }}
                  />
                  ROOMS
                </li>
              </ul>
            </CardText>
            <div style={{width: '30%', display: 'inlineBlock'}}>
              <IconButton
                style={{display: 'inlineBlock'}}
                disabled={roomCount === 1}
                onClick={() => {
                  this.decreaseRoomCount()
                }}
              >
                <ContentRemove color='#293580' />
              </IconButton>
              <span style={{verticalAlign: 'super'}}>{roomCount}</span>
              <IconButton
                style={{display: 'inlineBlock', marginTop: 8}}
                disabled={roomCount >= 5}
                onClick={() => {
                  this.increaseRoomCount()
                }}
              >
                <ContentAdd color='#ea2974' />
              </IconButton>
            </div>
          </SelectWrapper>
          <Divider style={{marginLeft: 8, marginRight: 8}} />
        </Card>
        <Card>
          <SelectWrapper>
            <CardText style={{width: '70%'}}>
              <ul style={{listStyle: 'none'}}>
                <li style={{fontWeight: 800, color: 'rgb(41, 53, 128)'}}>
                  <i
                    class='fa fa-user'
                    style={{
                      fontSize: '27px',
                      color: 'rgb(41, 53, 128)',
                      paddingRight: '16px'
                    }}
                  />
                  ADULTS
                </li>
              </ul>
            </CardText>
            <div style={{width: '30%', display: 'inlineBlock'}}>
              <IconButton
                style={{display: 'inlineBlock'}}
                disabled={
                  !!(isSubtractAdultCount || adultCount <= 1)
                }
                onClick={() => {
                  this.decreseAdultsCount()
                }}
              >
                <ContentRemove color='#293580' />
              </IconButton>
              <span style={{verticalAlign: 'super'}}>{adultCount}</span>
              <IconButton
                style={{display: 'inlineBlock', marginTop: 8}}
                disabled={!!isAdultAddDisabled}
                onClick={() => {
                  this.increaseAdultsCount()
                }}
              >
                <ContentAdd color='#ea2974' />
              </IconButton>
            </div>
          </SelectWrapper>
          <Divider style={{marginLeft: 8, marginRight: 8}} />
        </Card>
        <Card>
          <SelectWrapper>
            <CardText style={{width: '70%'}}>
              <ul style={{listStyle: 'none'}}>
                <li style={{fontWeight: 800, color: 'rgb(41, 53, 128)'}}>
                  <i
                    className='fa fa-child'
                    style={{
                      fontSize: '27px',
                      color: 'rgb(41, 53, 128)',
                      paddingRight: '16px'
                    }}
                  />
                  CHILDREN
                </li>
              </ul>
            </CardText>
            <div style={{width: '30%', display: 'inlineBlock'}}>
              <IconButton
                style={{display: 'inlineBlock'}}
                onClick={() => {
                  this.decreaseChildCount()
                }}
                disabled={
                  !!(isSubtractChildCount || childrenCount <= 0)
                }
              >
                <ContentRemove color='#293580' />
              </IconButton>
              <span style={{verticalAlign: 'super'}}>{childrenCount}</span>
              <IconButton
                style={{display: 'inlineBlock', marginTop: 8}}
                disabled={!!isChildAddDisabled}
                onClick={() => {
                  this.increaseChildCount()
                }}
              >
                <ContentAdd color='#ea2974' />
              </IconButton>
            </div>
          </SelectWrapper>
        </Card>
      </FlexContainer>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
