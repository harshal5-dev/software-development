package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L16_Sorting.Assignment;

import java.util.Arrays;

public class Assignment1 {

  int solve(int[] A) {
    Arrays.sort(A);
    int N = A.length;
    int ans = 0;

    for (int index = N -1; index >= 0;index--) {
      ans += A[index] * (N - index);
    }

    return ans;
  }
}
