package modules.M5_Advanced_DSA_1.L2_Arrays_2_Two_Dimensional.Lecture;

import util.CommonUtil;

public class Prefix2DSum {

  static int[][] prefix2DSum(int[][] A) {
    int N = A.length;
    int M = A[0].length;
    int[][] prefixSum = new int[N][M];


    for (int row = 0; row < N; row++) {
      prefixSum[row][0] = A[row][0];

      for (int col = 1; col < M; col++) {
        prefixSum[row][col] = prefixSum[row][col-1] + A[row][col];
      }
    }

    for (int col = 0; col < M; col++) {
      prefixSum[0][col] = prefixSum[0][col];
      for (int row = 1; row < N; row++) {
        prefixSum[row][col] = prefixSum[row-1][col] + A[row][col];
      }
    }

    return prefixSum;
  }

  public static void main(String[] args) {
    int[][] arr = {
        { 1, 2, 3 },
        { 4, 5, 6 },
        { 7, 8, 9 }
    };

    System.out.println();
    System.out.println("Q Given arr[N][M]. create prefix sum array.");
    System.out.println("--------------------------------------------------");
    System.out.println("Time Complexity -> O(N*M)");
    System.out.println("Space Complexity -> O(1)");
    System.out.println("-----------------------------------");
    System.out.println("Input Array ->");
    CommonUtil.print2DArray(arr);
    System.out.println("Output ->");
    CommonUtil.print2DArray(prefix2DSum(arr));
    System.out.println("-----------------------");
    System.out.println();
  }

}
