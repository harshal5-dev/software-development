package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L7_Arrays_Subarrays.Assignment;

public class Assignment4 {

  static int[] solve(int[] A, int B, int C) {
    int[] ans = new int[C- B + 1];
    int ansIndex = 0;

    for (int index = B; index <= C; index++) {
      ans[ansIndex] = A[index];
      ansIndex++;
    }

    return ans;
  }
}
