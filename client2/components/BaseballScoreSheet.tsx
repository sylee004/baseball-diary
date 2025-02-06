import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { sheetStyles } from '@/styles/sheet.style'
import { SHEET_MOOD, SHEET_TEAM, SHEET_TEAM_NAME, SHEET_WEATHER } from '@/enums/sheet.enum'
import GameInfoComponent from '@/components/scoreSheets/GameInfo.component'

const BaseballScoreSheet = () => {
  const [gameInfo, setGameInfo] = useState({
    date: new Date(),
    stadium: '',
    time: new Date(),
    weather: SHEET_WEATHER.SUNNY,
    mood: SHEET_MOOD.HAPPY,
    awayTeam: SHEET_TEAM_NAME.KIA,
    homeTeam: SHEET_TEAM_NAME.SAMSUNG,
  });
  const [result, setResult] = useState({ win: false, lose: false, draw: false, cancel: false });

  const [lineUp, setLineUp] = useState(Array(9).fill({ name: '', position: '', record: ''}));
  const [score, setScore] = useState(Array(12).fill({ [SHEET_TEAM.AWAY]: '-', [SHEET_TEAM.HOME]: '-' }));
  const [record, setRecord] = useState('');

  const [mvp, setMvp] = useState('');
  const [note, setNote] = useState('');
  const [scoreResult, setScoreResult] = useState({ [SHEET_TEAM.AWAY]: 0, [SHEET_TEAM.HOME]: 0 })

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={sheetStyles.container}
    >
      <ScrollView contentContainerStyle={sheetStyles.scrollContent}>
        {/*<Text style={sheetStyles.title}>Baseball Score Sheet</Text>*/}

        <GameInfoComponent gameInfo={gameInfo} setGameInfo={setGameInfo} result={result} setResult={setResult}/>

        <View style={sheetStyles.section}>
          <Text style={sheetStyles.sectionTitle}>Line-Up</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
            {lineUp.map((player, index) =>  (
              <View key={`player_container_${index}`} style={sheetStyles.inputOption}>
                <Text style={[sheetStyles.number]}>{index + 1}</Text>
              <TextInput
                key={index}
                style={[sheetStyles.input, sheetStyles.nameInput]}
                value={player.name}
                onChangeText={(text) => {
                  const newLineUp = [...lineUp];
                  newLineUp[index] = { ...newLineUp[index], name: text };
                  setLineUp(newLineUp);
                }}
                placeholder={`name`}
              />
              <TextInput
                style={[sheetStyles.input, sheetStyles.positionInput]}
                value={player.position}
                onChangeText={(text) => {
                  const newLineUp = [...lineUp];
                  newLineUp[index] = { ...newLineUp[index], position: text };
                  setLineUp(newLineUp);
                }}
                placeholder={`position`}
              />
              <TextInput
                style={[sheetStyles.input, sheetStyles.recordInput]}
                value={player.record}
                onChangeText={(text) => {
                  const newLineUp = [...lineUp];
                  newLineUp[index] = { ...newLineUp[index], record: text };
                  setLineUp(newLineUp);
                }}
                placeholder={`record`}
              />
            </View>
              )
            )}
            </View>
          </ScrollView>
        </View>

        <View style={sheetStyles.section}>
          <Text style={sheetStyles.sectionTitle}>Score</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={sheetStyles.scoreRow}>
                <Text style={sheetStyles.scoreCell}>Team</Text>
                {Array(12).fill('').map((_, i) => (
                  <Text key={i} style={sheetStyles.scoreCell}>{i + 1}</Text>
                ))}
                <Text style={sheetStyles.scoreCell}>R</Text>
              </View>
              {Object.values(SHEET_TEAM).map((team, teamIndex) => (
                <View key={`${team}_${teamIndex}`} style={sheetStyles.scoreRow}>
                  <Text style={sheetStyles.scoreCell}>{team === SHEET_TEAM.AWAY ? gameInfo.awayTeam : gameInfo.homeTeam}</Text>
                  {score.map((inning, i) => (
                    <TextInput
                      key={`${team}_${teamIndex}_${i}`}
                      style={sheetStyles.scoreInput}
                      value={inning[team]}
                      onChangeText={(text) => {
                        const newScore = [...score];
                        const scoreInput = isNaN(+text) ? '-' : +text
                        newScore[i] = { ...newScore[i], [team]: scoreInput };
                        setScore(newScore);
                        const sumScore = newScore.reduce((acc,ns) => {
                          const score = isNaN(+ns[team]) ? 0 : +ns[team]
                          return acc + score
                        }, 0)
                        setScoreResult({...scoreResult, [team]: sumScore })
                      }}
                      keyboardType="numeric" // 확인해보기
                    />
                  ))}
                  <Text style={sheetStyles.scoreResult}>{scoreResult[team]}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={sheetStyles.section}>
          <Text style={sheetStyles.sectionTitle}>Record</Text>
          <TextInput
            style={[sheetStyles.input, sheetStyles.multilineInput]}
            value={record}
            onChangeText={setRecord}
            placeholder="Enter record"
            multiline
          />
        </View>

        <View style={sheetStyles.section}>
          <Text style={sheetStyles.sectionTitle}>MVP</Text>
          <TextInput
            style={sheetStyles.input}
            value={mvp}
            onChangeText={setMvp}
            placeholder="Enter MVP"
          />
        </View>

        <View style={sheetStyles.section}>
          <Text style={sheetStyles.sectionTitle}>Note</Text>
          <TextInput
            style={[sheetStyles.input, sheetStyles.multilineInput]}
            value={note}
            onChangeText={setNote}
            placeholder="Enter notes"
            multiline
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BaseballScoreSheet;