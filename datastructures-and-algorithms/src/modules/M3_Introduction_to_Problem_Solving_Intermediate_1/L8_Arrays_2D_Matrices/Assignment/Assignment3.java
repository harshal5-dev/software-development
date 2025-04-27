package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L8_Arrays_2D_Matrices.Assignment;

public class Assignment3 {

  static int solve(final int[][] A) {
    int index = 0;
    int jIndex = 0;
    int N = A.length;
    int ans = 0;

    while (index < N) {
      ans += A[index][jIndex];
      index++;
      jIndex++;
    }

    return ans;
  }
}
