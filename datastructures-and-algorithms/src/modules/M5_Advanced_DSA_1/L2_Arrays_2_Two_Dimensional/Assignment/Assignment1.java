package modules.M5_Advanced_DSA_1.L2_Arrays_2_Two_Dimensional.Assignment;

public class Assignment1 {

  static int solve(int[][] A) {
    int N = A.length;
    int ans = 0;

    for (int row = 0; row < N; row++) {
      for (int col = 0; col < N; col++) {
        int contributionCount = (row + 1) * (col + 1) * (N - row) * (N - col);
        ans += A[row][col] * contributionCount;
      }
    }

    return ans;
  }

  public static void main(String[] args) {

  }
}
