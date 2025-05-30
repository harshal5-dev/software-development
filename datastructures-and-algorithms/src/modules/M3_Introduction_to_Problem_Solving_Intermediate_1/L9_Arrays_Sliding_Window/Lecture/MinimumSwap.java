package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L9_Arrays_Sliding_Window.Lecture;

public class MinimumSwap {

  static int findMinimumSwap(int[] A, int B) {
    int k = 0;
    int N = A.length;

    for (int ele: A) {
      if (ele <= B) {
        k++;
      }
    }

    if (k == 0 || k == 1 || k == N) {
      return 0;
    }

    int bad = 0;
    for (int index = 0; index < k; index++) {
      if (A[index] > B) {
        bad++;
      }
    }

    int ans = bad;
    int s = 1, e = k;

    while (e < N) {
      if (A[s-1] > B) {
        bad--;
      }
      if (A[e] > B) {
        bad++;
      }

      s++;
      e++;
      ans = Math.min(ans, bad);
    }

    return ans;
  }
}
