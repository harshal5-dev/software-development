package modules.M5_Advanced_DSA_1.L3_Arrays_3_Interview_Problems.Assignment;

public class Assignment4 {

  static int solve(int[][] A, int B) {
    int M = A[0].length;
    int N = A.length;
    int row = 0;
    int col = M - 1;
    int position = N * 1009 + M;
    boolean found = false;

    while (row < N && col >= 0) {
      if (A[row][col] == B) {
        position = Math.min(position, (row+1) * 1009 + col + 1);
        found = true;
        col--;
      } else if (B < A[row][col]) {
        col--;
      } else {
        row++;
      }
    }

    return found ? position : -1;
  }

  public static void main(String[] args) {
    int[][] A = {
      {1, 2, 3},
      {4, 5, 6},
      {7, 8, 9}
    };
    int B = 2;
    System.out.println(solve(A, B));
  }
}
