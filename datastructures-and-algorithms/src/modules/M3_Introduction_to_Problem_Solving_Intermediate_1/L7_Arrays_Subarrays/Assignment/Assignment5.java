package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L7_Arrays_Subarrays.Assignment;

public class Assignment5 {

  int maxSubarray(int A, int B, int[] C) {
    int ans = 0;

    for (int index = 0; index < A; index++) {
      int sum = 0;

      for (int jIndex = index; jIndex < A; jIndex++) {
        sum += C[jIndex];

        if (sum > B) {
          sum -= C[jIndex];
          break;
        }
      }

      ans = Math.max(ans, sum);
    }

    return ans;
  }
}
