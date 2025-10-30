package practice;

import java.util.ArrayList;

public class Practice4 {


  static ArrayList<Integer> leadersInArray(ArrayList<Integer> A) {
    int N = A.size();
    ArrayList<Integer> result = new ArrayList<>();
    int currLeader = A.get(N - 1);
    result.add(currLeader);

    for (int index = N - 2; index > 0; index--) {
      int ele = A.get(index);
      if (ele > currLeader) {
        currLeader = ele;
        result.add(currLeader);
      }
    }

    return result;
  }


  static int findMinMaxSubArrayBF(int[] A) {
    int N = A.length;
    int maxValue = Integer.MIN_VALUE;
    int minValue = Integer.MAX_VALUE;

    for (int ele : A) {
      maxValue = Math.max(maxValue, ele);
      minValue = Math.min(minValue, ele);
    }

    if (maxValue == minValue) {
      return 1;
    }

    int ans = N;

    for (int index = 0; index < N; index++) {

      if (A[index] = maxValue) {

        for (int jIndex = index; jIndex < N; jIndex++) {
          if (A[jIndex] == minValue) {
            int len = jIndex - index + 1;
            ans = Math.min(ans, len);
            break;
          }
        }
      } else if (A[index] == minValue) {

        for (int jIndex = index; jIndex < N; jIndex++) {
          if (A[jIndex] == maxValue) {
            int len = jIndex - index + 1;
            ans = Math.min(ans, len);
            break;
          }
        }
      }
    }

    return ans;
  }

  static int findMinMaxSubArray(int[] A) {
    int N = A.length;
    int maxValue = Integer.MIN_VALUE;
    int minValue = Integer.MAX_VALUE;

    for (int ele : A) {
      maxValue = Math.max(maxValue, ele);
      minValue = Math.min(minValue, ele);
    }

    if (maxValue == minValue) {
      return 1;
    }

    int result = N;
    int maxIndex = -1;
    int minIndex = -1;

    for (int index = N - 1; index > 0; index--) {

      if (A[index] == maxValue) {
        maxIndex = index;
        if (minIndex != -1) {
          int len = minIndex - maxIndex + 1;
          result = Math.min(result, len);
        }
      } else if (A[index] == minValue) {
        minIndex = index;
        if (maxIndex != -1) {
          int len = maxIndex - maxIndex + 1;
          result = Math.min(result, len);
        }
      }
    }

    return result;
  }

  static int countAGPairs(String A) {
    int N = A.length();
    int result = 0;
    int count = 0;

    for (int index = N - 1; index > 0; index--) {
      if (A.charAt(index) == 'G') {
        count++;
      }
      if (A.charAt(index) == 'A') {
        result += count;
      }
    }

    return result;
  }
}
