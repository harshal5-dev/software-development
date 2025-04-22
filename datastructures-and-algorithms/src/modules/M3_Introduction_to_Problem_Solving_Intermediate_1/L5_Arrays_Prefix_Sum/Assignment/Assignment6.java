package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L5_Arrays_Prefix_Sum.Assignment;

public class Assignment6 {

  static int[] prefixCount(int[] A) {
    int N = A.length;
    int[] prefixCount = new int[N];

    prefixCount[0] = (A[0] & 1) == 0 ? 1 : 0;

    for (int index = 1; index < N; index++) {
      prefixCount[index] = prefixCount[index - 1] + ((A[index] & 1) == 0 ? 1 : 0);
    }

    return prefixCount;
  }

  static int[] solve(int[] A, int[][] B) {
    int[] prefixCount = prefixCount(A);
    int N = B.length;
    int[] ans = new int[N];

    for (int index = 0; index < N; index++) {
      int leftIndex = B[index][0];
      int rightIndex = B[index][1];
      int count;

      if (leftIndex == 0) {
        count = prefixCount[rightIndex];
      } else {
        count = prefixCount[rightIndex] - prefixCount[leftIndex -1];
      }

      ans[index] = count;
    }

    return ans;
  }
}
