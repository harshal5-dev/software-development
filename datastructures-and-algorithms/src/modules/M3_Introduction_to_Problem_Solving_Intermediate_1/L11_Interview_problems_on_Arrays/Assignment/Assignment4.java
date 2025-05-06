package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L11_Interview_problems_on_Arrays.Assignment;

public class Assignment4 {

  int majorityElement(final int[] A) {
    int N = A.length;
    int ele = A[0];
    int freq = 1;

    for (int index = 1; index < N; index++) {
      if (freq == 0) {
        ele = A[index];
        freq = 1;
      } else if (A[index] == ele) {
        freq++;
      } else {
        freq--;
      }
    }

    return ele;
  }
}
