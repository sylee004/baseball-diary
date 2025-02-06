import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import ModalSelector from 'react-native-modal-selector';
import { sheetStyles } from '@/styles/sheet.style'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SHEET_MOOD, SHEET_TEAM_NAME, SHEET_WEATHER } from '@/enums/sheet.enum'

const GameInfoComponent = (arg: { gameInfo: any, setGameInfo: Dispatch<SetStateAction<any>>, result: any, setResult: Dispatch<SetStateAction<any>> }) => {
  const { gameInfo, setGameInfo, result, setResult } = arg

  const updateGameInfo = useCallback((key: string, value: any) => {
    setGameInfo(( prev: any) => ({ ...prev, [key]: value }));
  }, []);

  const renderDatePicker = () => (
    <DateTimePicker
      value={gameInfo.date}
      mode="date"
      display="default"
      onChange={(_, selectedDate) => updateGameInfo('date', selectedDate || gameInfo.date)}
    />
  );

  const renderTimePicker = () => (
    <DateTimePicker
      value={gameInfo.time}
      mode="time"
      display="default"
      onChange={(_, selectedTime) => updateGameInfo('time', selectedTime || gameInfo.time)}
    />
  );

  const weatherOptions = Object.values(SHEET_WEATHER).map((item, index) => ({ key: index, label: item }));
  const moodOptions = Object.values(SHEET_MOOD).map((item, index) => ({ key: index, label: item }));
  const teamNameOptions = Object.values(SHEET_TEAM_NAME).map((item, index) => ({ key: index, label: item }));

  return (
    <View style={sheetStyles.section}>
      <Text style={sheetStyles.sectionTitle}>Game Info</Text>
      <View style={sheetStyles.row}>
        <Text style={sheetStyles.labelBold}>Date</Text>
        {renderDatePicker()}
      </View>
      <View style={sheetStyles.row}>
        <Text style={sheetStyles.labelBold}>Time</Text>
        {renderTimePicker()}
      </View>
      <View style={sheetStyles.row}>
        <Text style={sheetStyles.labelBold}>Weather</Text>
        <ModalSelector
          data={weatherOptions}
          initValue={gameInfo.weather}
          onChange={(option: any) => updateGameInfo('weather', option.label)}
          style={sheetStyles.picker}
          selectTextStyle={{ fontSize: 16 }}
        />
      </View>
      <View style={sheetStyles.row}>
        <Text style={sheetStyles.labelBold}>Mood</Text>
        <ModalSelector
          data={moodOptions}
          initValue={gameInfo.mood}
          onChange={(option) => updateGameInfo('mood', option.label)}
          style={sheetStyles.picker}
          selectTextStyle={{ fontSize: 16 }}
        />
      </View>
      <View style={sheetStyles.row}>
        <Text style={sheetStyles.labelBold}>Stadium</Text>
        <TextInput
          style={sheetStyles.inputFull}
          value={gameInfo.stadium}
          onChangeText={(text) => updateGameInfo('stadium', text)}
          placeholder="Stadium"
        />
      </View>
      <View style={sheetStyles.row}>
        <View style={[gameInfoStyles.teamContainer, { marginRight: 8 }]}>
          <Text style={sheetStyles.labelBoldTop}>Home</Text>
          <ModalSelector
            data={teamNameOptions}
            initValue={gameInfo.homeTeam}
            onChange={(option) => updateGameInfo('homeTeam', option.label)}
            style={sheetStyles.picker}
            selectTextStyle={{ fontSize: 16 }}
          />
        </View>
        <View style={gameInfoStyles.vsContainer}>
          <Text style={gameInfoStyles.vsText}>VS</Text>
        </View>
        <View style={[gameInfoStyles.teamContainer, { marginLeft: 8 }]}>
          <Text style={sheetStyles.labelBoldTop}>Away</Text>
          <ModalSelector
            data={teamNameOptions}
            initValue={gameInfo.awayTeam}
            onChange={(option) => updateGameInfo('awayTeam', option.label)}
            style={sheetStyles.picker}
            selectTextStyle={{ fontSize: 16 }}
          />
        </View>
      </View>
      <View style={[sheetStyles.row, gameInfoStyles.rowRadioOption]}>
        <Text style={gameInfoStyles.labelBoldTopFull}>Result</Text>
        <View style={gameInfoStyles.radioOption}>
          <TouchableOpacity
            style={[sheetStyles.checkbox, result.win && sheetStyles.checked]}
            onPress={() =>  setResult({ win: true, lose: false, draw: false, cancel: false })}
          >
            <Text>Win</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[sheetStyles.checkbox, result.lose && sheetStyles.checked]}
            onPress={() => setResult({ win: false, lose: true, draw: false,cancel: false })}
          >
            <Text>Lose</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[sheetStyles.checkbox, result.draw && sheetStyles.checked]}
            onPress={() => setResult({ win: false, lose: false, draw: true, cancel: false })}
          >
            <Text>Draw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[sheetStyles.checkbox, result.cancel && sheetStyles.checked]}
            onPress={() => setResult({ win: false, lose: false, draw: false, cancel: true })}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default GameInfoComponent

const gameInfoStyles = StyleSheet.create( {
  teamContainer: {
    flex: 1,
    // 추가 스타일
  },
  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  vsText: {
    fontSize: 16,
    fontWeight: 'semibold'
  },
  rowRadioOption: { flexDirection: 'column', alignItems: 'flex-start' },
  radioOption: { flexDirection: 'row', flexWrap: 'wrap' },
  labelBoldTopFull: {
    fontWeight: 'bold',
    marginRight: 8,
    marginBottom: 8,
    width: '100%'
  },
})