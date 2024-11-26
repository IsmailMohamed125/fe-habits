
import { View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

function Progress() {
  return (
    <View>
      <ProgressBar progress={0.5} width={390} height={20}  />
    </View>
  );
}

export default Progress